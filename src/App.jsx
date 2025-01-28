import { useState } from 'react'
import arrow from './assets/arrow.png';
import mcd from './assets/mcdnd.png';
import { AnimatePresence, motion } from 'framer-motion';


const NumberCard = ({number, type}) => {
  return (
    <div className={`h-[100px] w-full border-t border-b border-gray-500 flex items-center justify-center font-bold ${type == 'prep' ? 'text-gray-600' : 'text-green-600'} text-8xl`}>
      {number}
    </div>
  )
}

function App() {
  const [orders, setOrders]  = useState([
    ['081', '084', '085', '086', '087', '088', '089', '090', '091', '092'],
    ['070', '071', '072', '073', '074', '075', '076', '077','078','079']
  ])
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newOrder, setNewOrder] = useState("");

  const handleRemoveOrder = (listIndex, order) => {
    setOrders((prev) => {
      const updatedList = [...prev];
      updatedList[listIndex] = updatedList[listIndex].filter((o) => o !== order);
      return updatedList;
    });
  };

  const handleAddOrder = (listIndex) => {
    if (newOrder.trim() === "") return;

    setOrders((prev) => {
      const updatedList = [...prev];
      if (!updatedList[listIndex].includes(newOrder)) {
        updatedList[listIndex] = [...updatedList[listIndex], newOrder];
      }
      return updatedList;
    });

    setNewOrder(""); 
  };
  return (
    <>
    <div className='h-screen w-full flex flex-col bg-white overflow-hidden'>
      <div className='h-[90%] w-full  flex gap-2'>
      <div className='h-full w-1/3 flex flex-col'>
        <div className='h-[10%] w-full bg-gray-600 flex items-center justify-center '>
          <span className='text-[60px] '>Preparing ...</span>
        </div>
        <div className='h-full w-full flex flex-row'>
          <div className='w-1/2 h-full'>
          {orders[0].map((order, index) => {
            if(index <= 6) return (
              <NumberCard number={order} type='prep' key={index}/>
            )
          })}
          </div>
          <div className='w-1/2 h-full'>
          {orders[0].map((order, index) => {
            if(index > 6) return (
              <NumberCard number={order} type='prep' key={index}/>
            )
          })}
          </div>
        </div>
      </div>
      <div className='h-[10%] w-1/3 flex flex-col'>
      <div className='h-full w-full bg-green-600 flex items-center justify-center '>
          <span className='text-[60px]'>Please Collect </span>
        </div>
        <div className='h-[10%] w-full flex flex-row'>
          <div className='w-1/2 h-full'>
          {orders[1].map((order, index) => {
            if(index <= 6) return (
              <NumberCard number={order} key={index}/>
            )
          })}
          </div>
          <div className='w-1/2 h-full'>
          {orders[1].map((order, index) => {
            if(index > 6) return (
              <NumberCard number={order}  key={index}/>
            )
          })}
          </div>

        </div>
      </div>
      <div className='h-[90%] w-1/3 flex items-center justify-center'>
      <img src={mcd} alt="mcdonalds" className='w-[500px]' />
      </div>
      </div>
      <div className='h-[10%] px-10 w-full bg-black flex flex-row items-center gap-2'>
        <img src={arrow} alt="arrow" className='w-[70px] h-[70px]'
        onClick={() => setIsPopupVisible(true)}
        />
        <h1 className='text-5xl font-bold'>Why not order ahead? Try the My Mcdonald's App.</h1>
      </div>

      
    <AnimatePresence>
      {isPopupVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
          animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
          exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-black rounded-xl text-center w-[600px] max-w-4xl shadow-lg  p-4"
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <div className="w-full h-3 flex justify-end">
              <a
                className="p-4 cursor-pointer"
                onClick={() => setIsPopupVisible(false)}
              >
                <span className="text-white font-black select-none">✕</span>
              </a>
            </div>

            <div className="p-8 flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-white">Secret Menu</h1>

              <div className="text-left text-white">
                <h2 className="font-semibold">Preparing:</h2>
                <ul className="mb-2">
                  {orders[0].map((order) => (
                    <li
                      key={order}
                      onClick={() => handleRemoveOrder(0, order)}
                      className="cursor-pointer p-1 bg-gray-600 text-sm rounded-lg mb-1"
                    >
                      {order}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-left text-white">
                <h2 className="font-semibold">Done:</h2>
                <ul>
                  {orders[1].map((order) => (
                    <li
                      key={order}
                      onClick={() => handleRemoveOrder(1, order)}
                      className="cursor-pointer p-1 bg-gray-600 text-sm rounded-lg mb-1"
                    >
                      {order}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newOrder}
                  onChange={(e) => setNewOrder(e.target.value)}
                  className="h-8 placeholder-gray text-[#919EF1] text-sm rounded-lg border-gray-200 focus:border-transparent focus:ring-0 outline-none block w-[80px] pl-2.5"
                  placeholder="Order #"
                  required
                />
                <button
                  className="rounded-lg bg-gray-600 p-2 text-white"
                  onClick={() => handleAddOrder(0)}
                >
                  Prep
                </button>
                <button
                  className="rounded-lg bg-gray-600 p-2 text-white"
                  onClick={() => handleAddOrder(1)}
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </div>
    </>
  )
}

export default App
