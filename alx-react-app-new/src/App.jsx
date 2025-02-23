import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Counter from "./components/Counter"; // Import the Counter component

function App() {
  return (
    <div>
      <Header />
      <UserProfile
        name="Alice"
        age={28}
        bio="Loves traveling and exploring new cultures."
      />
      <MainContent />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
