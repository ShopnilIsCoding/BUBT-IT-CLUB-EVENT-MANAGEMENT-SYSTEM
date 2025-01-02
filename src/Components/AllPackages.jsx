import { Spinner} from "@material-tailwind/react";
import PackageCard from './PackageCard';
import usePackages from '../hooks/usePackages';

const AllPackages = () => {
  const [packages,isLoading]=usePackages()

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-8 text-primary">All Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-2">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
