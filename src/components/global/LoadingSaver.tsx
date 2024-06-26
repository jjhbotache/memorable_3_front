import { useLoaderData } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function LoadingSaver({children}:Props) {
  
  const [isLoading, setIsLoading] = useState(true);
  const data = useLoaderData();
  
  useEffect(() => {
    console.log("data in loadingSaver",data);
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  
  return isLoading ? <LoadingScreen /> : <>{children}</>;
  
};
