/* eslint-disable react/prop-types */
const SearchProduct = ({ searchTerm, setSearchTerm, data, setFilteredData }) => {
  const handleChange = event => {
    setSearchTerm(event.target.value);
  }

  const performSearch = () => {
      if (Array.isArray(data)) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredData = data.filter(product => product.title.toLowerCase().includes(lowerCaseSearchTerm));
        setFilteredData(filteredData); // Update the filteredData state in the parent component
      }
  }
  return (
   <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px'
        }}
      />
      <button onClick={performSearch}
       style={{
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer'
      }}>Search</button>
    </div>
   </>
  )
};

export default SearchProduct;

