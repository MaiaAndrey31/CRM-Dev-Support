import PropTypes from "prop-types";
import {
  HeaderContainer,
  HeaderLink,
  LogoTitle,
  Navigation,
  StatusIndicator,
  Logout,
} from "./styles";
import Logo from "../../assets/logo.jpg";
import { useResolvedPath } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";
import { auth } from "../../services/firebaseConnection.js";
import { signOut } from "firebase/auth";

export default function Header({ status, page }) {
  const { pathname } = useResolvedPath();

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <HeaderContainer>
      <LogoTitle>
        <img src={Logo} alt="logo" /> {page}
      </LogoTitle>
      <Navigation>
        <div>
          <HeaderLink to={"/"} $isActive={pathname === "/"}>
            Home
          </HeaderLink>
          <HeaderLink to={"/painel"} $isActive={pathname === "/painel"}>
            Troféus
          </HeaderLink>
          <HeaderLink to={"/links"} $isActive={pathname === "/links"}>
            Links Úteis
          </HeaderLink>
          <HeaderLink to={"/faq"} $isActive={pathname === "/faq"}>
            FAQ
          </HeaderLink>
          <HeaderLink to={"/faq"} $isActive={pathname === "/faq"}>
            FAQ
          </HeaderLink>
          <HeaderLink to={"/utils"} $isActive={pathname === "/utils"}>
            FAQ
          </HeaderLink>
        </div>
      </Navigation>
      <StatusIndicator className={status}>
        <span className="status-dot" />
        <span>
          {status === "connected"
            ? "Conectado"
            : status === "error"
            ? "Erro"
            : "Conectando..."}
        </span>
      </StatusIndicator>

      <Logout onClick={handleLogout}>
        <SignOut size={32} />
      </Logout>
    </HeaderContainer>
  );
}

Header.propTypes = {
  status: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
