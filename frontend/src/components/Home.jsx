import React from 'react'
import { useSelector } from 'react-redux';
import UserDashbord from './HomeFeatures/UserDashbord';
import DeliveryBoy from './HomeFeatures/DeliveryBoy';
import OwnerDashbord from './HomeFeatures/OwnerDashbord';

const Home = () => {

  const { userData } = useSelector(state => state.user);
  console.log(userData);

  return (
    <div className='w-screen min-h-screen pt-10 flex flex-col items-center bg-[#fff9f6]'>
      {userData?.data?.category === 'consumer' && <UserDashbord />}
      {userData?.data?.category === 'restaurant' && <OwnerDashbord />}
      {userData?.data?.category === 'deliveryagent' && <DeliveryBoy />}
    </div>
  )
}

export default Home;
// "consumer", "restaurant", "deliveryagent",