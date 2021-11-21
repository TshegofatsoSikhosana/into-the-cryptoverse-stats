

import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import ModalComponent from './Modal'

export default function TableComponent(props){
    const [tableState,setTableState] = useState(props.tableState);
    const [show,setShow] = useState(false);
    const [modalData,setModalData] = useState({})
    useEffect(()=> {
        setTableState(props.tableState)
    },[props.tableState])

    function isBurnt(asset){
      let response = 'N/A';
      asset.owners?.accounts.map((account)=>{
        if(account.owner_of === '0x000000000000000000000000000000000000dead'){
          response = account.amount;
        }
      })
      return response;
    }

    function handleRowClick(asset){
      console.log('yep',asset);
      setModalData(asset);
      setTimeout(() => setShow(true),500);
    }

    function handleClose(){
      setShow(false);
    }

    return <>
    <h1 className="w-100 p-4 text-center mb-2">WINNING Collection Stats</h1>
    { tableState?.length != 0 &&
     <Table hover className="p-5 w-100" responsive  >
        <thead>
          <tr>
            <th scope="col-4   w-25 "><p className="text-white">Cryptoverse</p></th>
            <th scope="col-3 ">Name</th>
            <th scope="col-3  ">Total</th>
            <th scope="col-3  ">Burnt</th>
            <th scope="col-3  ">Sales</th>
            <th scope="col-3  ">Owners</th>
          </tr>
        </thead>
        <tbody>
          { tableState?.map((asset)=> {
              return ( asset &&

              <tr key={asset.token_id} onClick={() => handleRowClick(asset)}>
                <td className="col-4  w-25 ">
                  <div  className="w-100 p-2 ">
                    <img src={asset.thumbnail} className="w-75"/>
                  </div>
                </td>
                <td className="col-3">
                  <p className="w-100 p-2 ">
                  {asset.name}
                    </p>
                </td>
                <td className="col-3 ">
                  <p className="w-100 p-2 ">{asset['owners']?.total}</p>
                </td>
                <td className="col-3 ">
                  <p className="w-100 p-2 ">{isBurnt(asset)}</p>
                </td>
                <td className="col-3 ">
                  <p className="w-100 p-2 ">{asset.num_sales}</p>
                </td>
                <td className="col-3 ">
                  <p className="w-100 p-2 ">{asset['owners']?.accounts.length}</p>
                </td>
              </tr>)
          })}
        </tbody>
    </Table>
    }
    <ModalComponent show={show} asset={modalData} handleClose={handleClose} isBurnt={isBurnt}/>

    </>
}