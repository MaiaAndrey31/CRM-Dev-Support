import {
  Link as LinkIcon,
  GithubLogo,
  Book,
  Wrench,
  Trophy,
} from "@phosphor-icons/react";
import Header from "../../components/Header";
import {
  HomeContainer,
  Title,
  Layout,
  Content,
  MainContent,
  MenuItem,
} from "./styles";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const status = "connected";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header status={status} page="Dev Club Support CRM" />
      <Content>
        <MainContent>
          <HomeContainer>
            <Title>Bem-vindo ao Dev Club CRM</Title>
            <div>
              <MenuItem>
                <button
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/painel")}
                >
                  <Trophy size={60} color={theme.colors.text} weight="fill" />
                  <p>Troféus Admin</p>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="button_slide slide_diagonal"
                  onClick={() => navigate("/links")}
                >
                  <LinkIcon size={60} color={theme.colors.text} weight="fill" />
                  <p>Links Úteis</p>
                </button>
              </MenuItem>
              <MenuItem>
                <button className="button_slide slide_diagonal">
                  <GithubLogo size={60} color={theme.colors.text} />
                  <p>GitHub</p>
                </button>
              </MenuItem>
              <MenuItem>
                <button className="button_slide slide_diagonal">
                  <Book size={60} color={theme.colors.text} />
                  <p>Documentação</p>
                </button>
              </MenuItem>
              <MenuItem>
                <button className="button_slide slide_diagonal">
                  <Wrench size={60} color={theme.colors.text} />
                  <p>Ferramentas</p>
                </button>
              </MenuItem>
            </div>
          </HomeContainer>
        </MainContent>
      </Content>
    </Layout>
  );
};

export default Home;
