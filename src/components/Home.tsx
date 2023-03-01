const Home = () => {
  const sampleVar = import.meta.env.VITE_SAMPLE_VARIABLE
  console.log(sampleVar);

  return (
    <div>
      <h1>Seemless Pipeline Home</h1>
    </div>
  );
}

export default Home;