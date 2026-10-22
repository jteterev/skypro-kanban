import { GlobalStyles } from "./styles/GlobalStyles";
import { WrapperStyled } from "./App.styled";
import { AuthContext, useAuthProvider } from "./contexts/AuthContext";
import { TaskContext, useTaskProvider } from "./contexts/TaskContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const auth = useAuthProvider();
  const tasks = useTaskProvider();

  return (
    <AuthContext.Provider value={auth}>
      <TaskContext.Provider value={tasks}>
        <WrapperStyled>
          <GlobalStyles />
          <AppRoutes />
        </WrapperStyled>
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
