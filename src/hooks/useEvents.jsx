import { useQuery } from "@tanstack/react-query";

const usePackages = () => {
    const { isLoading, data: events } = useQuery({
        queryKey: ["events","home"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/events");
          return res.json();
        },
    });
    // console.log(events)
    return [events,isLoading];
};

export default usePackages;