import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import router from 'next/router'

function ModalComponent(props) {
    const [show, setShow] = useState(props.show);
    const [asset,setAsset] = useState(props.asset)
  
    const {handleClose}  = props;
    const {isBurnt} = props

    useEffect(()=>{
        // console.log('Show props',asset)
        setShow(props.show)
    },[props.show])

    useEffect(()=>{
        setAsset(props.asset);
    },[props.asset])
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{asset.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div  className="w-100 p-2">
            <img src={asset.thumbnail} className="w-100"/>
          </div>
          { asset?.animation_url &&
            <Button variant="success" onClick={()=>{router.push(asset.animation_url)}} className="m-2">
                Play video
            </Button>
          }
         
          <p className="p-2">
              {asset.description}
          </p>

            <h2 className="eth-price p-2">
            {'Last Sale:  '}
            {Number(asset?.last_sale?.total).toFixed(2) + ' '+ asset?.last_sale?.symbol}
            <p className="usd-price p-2">
                (${asset?.last_sale?.usd}) 
            </p>
            </h2>

          <p className="w-100 p-2 label-tag">Total : {asset['owners']?.total}</p>
          <p className="w-100 p-2 label-tag">Number of Sales : {asset.num_sales}</p>
          <p className="w-100 p-2 label-tag">Burnt : {isBurnt(asset)}</p>
          <p className="w-100 p-2 label-tag">Owners : {asset['owners']?.accounts.length}</p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => router?.push(asset?.opensea_link)} >
              View on OpenSea
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default ModalComponent;