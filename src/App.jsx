import LandingPage from "./pages/LandingPage"

const Layout = ({ children }) => (
  <div className='max-w-5xl mx-auto px-4 mt-4'>{children}</div>
)

const App = () => (
  <Layout>
    <LandingPage />
  </Layout>
)


export default App