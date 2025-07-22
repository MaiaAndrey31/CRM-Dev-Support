import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import SidebarFilters from '../../components/SidebarFilters'
import OrdersTable from '../../components/OrdersTable'
import Pagination from '../../components/Pagination'
import OrderModal from '../../components/OrderModal'
import { db } from '../../services/firebaseConnection'
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { Content, Layout, MainContent } from './styles'

function Trophy() {
  const [status, setStatus] = useState('connecting')
  const [pedidos, setPedidos] = useState([])
  const [filtros, setFiltros] = useState({ status: '', busca: '' })
  const [pagina, setPagina] = useState(1)
  const [itensPorPagina] = useState(10)
  const [modalPedido, setModalPedido] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let unsubscribe

    async function setupFirebaseConnection() {
      try {
        setStatus('connecting')
        const pedidosCollection = collection(db, 'pedidos')
        const q = query(pedidosCollection, orderBy('createdAt', 'desc'))

        // Configurar listener em tempo real
        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            const pedidosData = []
            querySnapshot.forEach((doc) => {
              pedidosData.push({
                id: doc.id,
                ...doc.data(),
              })
            })

            console.log('Pedidos atualizados:', pedidosData)
            setPedidos(pedidosData)
            setStatus('connected')
          },
          (error) => {
            console.error('Erro ao escutar mudanças:', error)
            setStatus('error')
          },
        )
      } catch (error) {
        console.error('Erro ao conectar com Firebase:', error)
        setStatus('error')
      }
    }

    setupFirebaseConnection()

    // Cleanup do listener quando o componente for desmontado
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // Função para atualizar pedido no Firebase
  const updatePedidoInFirebase = async (pedidoId, updates) => {
    try {
      const pedidoRef = doc(db, 'pedidos', pedidoId)
      await updateDoc(pedidoRef, {
        ...updates,
        updatedAt: new Date(),
      })
      console.log('Pedido atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      return false
    }
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    const statusOk = !filtros.status || p.status === filtros.status
    const buscaOk =
      !filtros.busca ||
      [p.nome, p.email, p.telefone].some((v) =>
        v?.toLowerCase().includes(filtros.busca.toLowerCase()),
      )
    return statusOk && buscaOk
  })

  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina)
  const pedidosPagina = pedidosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina,
  )

  function handleStatusChange(status) {
    setFiltros((f) => ({ ...f, status }))
    setPagina(1)
  }

  function handleSearchChange(busca) {
    setFiltros((f) => ({ ...f, busca }))
    setPagina(1)
  }

  function handleApplyFilters() {
    setPagina(1)
  }

  function handleResetFilters() {
    setFiltros({ status: '', busca: '' })
    setPagina(1)
  }

  function handleViewPedido(pedido) {
    setModalPedido(pedido)
    setShowModal(true)
  }

  function handleEditPedido(pedido) {
    setModalPedido(pedido)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setModalPedido(null)
  }

  // Função para atualizar status do pedido
  const handleStatusUpdate = async (newStatus) => {
    if (!modalPedido || !modalPedido.id) return

    const success = await updatePedidoInFirebase(modalPedido.id, {
      status: newStatus,
    })

    if (success) {
      setModalPedido((prev) => ({ ...prev, status: newStatus }))
      alert('Status atualizado com sucesso!')
    } else {
      alert('Erro ao atualizar status. Tente novamente.')
    }
  }

  // Função para atualizar código de rastreio
  const handleRastreioUpdate = async (novoCodigoRastreio) => {
    if (!modalPedido || !modalPedido.id) return

    const success = await updatePedidoInFirebase(modalPedido.id, {
      codigoRastreio: novoCodigoRastreio,
    })

    if (success) {
      setModalPedido((prev) => ({
        ...prev,
        codigoRastreio: novoCodigoRastreio,
      }))
      alert('Código de rastreio atualizado com sucesso!')
    } else {
      alert('Erro ao atualizar código de rastreio. Tente novamente.')
    }
  }

  return (
    <Layout>
      <Header status={status} page='Troféus Dev Club' />
      <Content>
        <SidebarFilters
          status={filtros.status}
          search={filtros.busca}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
        <MainContent>
          <OrdersTable
            pedidos={pedidosPagina}
            onView={handleViewPedido}
            onEdit={handleEditPedido}
          />
          <Pagination
            page={pagina}
            totalPages={totalPaginas}
            onPrev={() => setPagina((p) => Math.max(1, p - 1))}
            onNext={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
          />
        </MainContent>
      </Content>
      <OrderModal
        show={showModal}
        pedido={modalPedido}
        onClose={handleCloseModal}
        onNotify={() => alert('Notificação enviada!')}
        onStatusChange={(status) => {
          setModalPedido((p) => ({ ...p, status }))
          handleStatusUpdate(status)
        }}
        onRastreioChange={(codigoRastreio) => {
          setModalPedido((p) => ({ ...p, codigoRastreio }))
          handleRastreioUpdate(codigoRastreio)
        }}
        onStatusUpdate={() => {
          if (modalPedido?.status) {
            handleStatusUpdate(modalPedido.status)
          }
        }}
      />
    </Layout>
  )
}

export default Trophy
