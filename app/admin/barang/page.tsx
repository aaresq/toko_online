import { GetBarang } from "@/services/barang";

const BarangPage = async () => {
  const { status, message, data } = await GetBarang();
  console.log("Status:", status);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>
     </div> 
  );
};
export default BarangPage;