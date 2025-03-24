import AdminAuth from "./auth/ParaAuth";
import WarpcastAuth from "./auth/WarpcastAuth";

const Header = () => {
  return (
    <div className="flex min-h-[50px] w-full flex-row-reverse items-center gap-2 bg-sky-500/100 p-2">
      <WarpcastAuth />
      <AdminAuth />
      <h1 className="text-4xl grow">Bulk Pregen Demo</h1>
    </div>
  );
};

export default Header;
