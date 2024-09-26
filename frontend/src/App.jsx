import './App.css'
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Houses from './pages/Houses';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import  AddHouseModal  from './components/modals/AddHouseModal';
import { houseAPI } from './APIs/Apis';
import { paymentAPI } from './APIs/Apis';
import { tenantAPI } from './APIs/Apis';

function App() {

  const [showModal, setShowModal] = useState(false); 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [houses, setHouses] = useState([])
  const [allTenants, setAllTenants] = useState([])
  const [refresh, setRefresh] = useState(false); 
  const [houseToEdit, setHouseToEdit] = useState(null);
  const [payments, setPayments] = useState([])

  const handleShowTenantModal = () => setShowTenantModal(true);
  const handleCloseTenantModal = () => setShowTenantModal(false);
  console.log("showTenantModal", showTenantModal)
  
  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setHouseToEdit(null);
  }
  
  useEffect(() => {
    const fetchHouses = async () => {
      const data = await houseAPI.getHouses();
      setHouses(data);
    }
    fetchHouses();
  }, [refresh]);

  const handleHouseAdded = () => {
    setRefresh(!refresh); 
  }
  
  const handleEditHouse = (house) => {
    setHouseToEdit(house);
    handleShowModal();
    
  }
  const editHouse = async (house, id) => {
    try {
      const response = await houseAPI.updateHouse(house, id);
      if (response.status === 200 || response.status === 201) {
        handleCloseModal();
        handleHouseAdded();
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  const handleDeleteHouse = (houseId) => {
    const deleteHouse = async () => {
      try {
        const response = await houseAPI.deleteHouse(houseId);
        if (response.status === 200) {
          handleHouseAdded();
        }
      } catch (error) {
        console.error("error", error);
      }
    }
    deleteHouse();
  }


  
  const addPayment = async (payment) => {
    console.log("payment to save", payment)
    try {
      const response = await paymentAPI.addPayment(payment);
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        handleClosePaymentModal();
      }
    } catch (error) {
      console.error("error", error);
    }
  }
  

  const fetchTenants = async () => {
    const response = await tenantAPI.getTenants();
    console.log("response", response);
    setAllTenants(response.data);
  }
  useEffect(() => {
    fetchTenants()
  }, [refresh]);

  const addTenant = async (tenant) => {
    try {
      const response = await tenantAPI.addTenant(tenant);
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        handleCloseTenantModal();
        fetchTenants();
      } else {
        console.log("status caught", response)
      }
    } catch (error) {
      console.error("error", error);
    }
  }


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard houses={houses} />} />
          <Route path="/houses" element={< Houses houses={houses} handleHouseAdded={handleHouseAdded} handleEditHouse={handleEditHouse} handleDeleteHouse={handleDeleteHouse} handleCloseModal={handleCloseModal} handleShowModal={handleShowModal} showModal={showModal} />} />
          <Route path="/tenants" element={< Tenants allTenants={allTenants} handleShowTenantModal={handleShowTenantModal} handleCloseTenantModal={handleCloseTenantModal} showTenantModal={showTenantModal} houses={houses} addTenant={addTenant} />} />
          <Route path="/payments" element={< Payments  showPaymentModal={showPaymentModal} handleClosePaymentModal={handleClosePaymentModal} handleShowPaymentModal={handleShowPaymentModal} addPayment={addPayment} allTenants={allTenants} payment={payments} />} />
        </Routes>
      </Router>
      <AddHouseModal showModal={showModal} handleCloseModal={handleCloseModal} handleHouseAdded={handleHouseAdded} houseToEdit={houseToEdit} editHouse={editHouse} />

    </>

  )
}

export default App
