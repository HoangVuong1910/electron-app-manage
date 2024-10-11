interface Props {
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

const ProductSearch = ({ searchTerm, onSearch }: Props) => {
  return (
    <div className="">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="border border-gray-300 rounded py-2 px-4 h-9 w-full focus:outline-none"
        placeholder="Search..."
      />
    </div>
  );
};

export default ProductSearch;
