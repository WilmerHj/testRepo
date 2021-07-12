import {useState, useEffect, React} from 'react'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { InputGroup, InputGroupAddon, Input, Button, InputGroupText} from 'reactstrap';

const post = (method, item, url=false) => {
    fetch(url || "http://localhost:5000/api/items/", {
        method: method,
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(res => alert(res.ok))
}

const AddItem = ({onAdd}) => {
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [scanner, setScanner] = useState(false);
    const [ ean, setEan ] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/api/items/barcodes/")
            .then(res => {
                if(res.ok) return res.json()
                throw res;
            })
            .then(data => setItems(data));
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        if(!name){
            alert("Skriv varans namn");
            return;
        }

        onAdd({name, date});
        post("POST", {name, ean}, "http://localhost:5000/api/items/BarCodes/");

        setName("")
        setDate("")
    }

    return (
        <form onSubmit={onSubmit}>
            {scanner && <><BarcodeScannerComponent
                        width="100%"
                        height="100%"
                        onUpdate={(err, result) => {
                        if (result) {
                            setEan(result.text);
                            console.log(items.filter(e => e.ean === result.text));
                            document.getElementById("vara").value = items.filter(e => e.ean === result.text)[0].name;
                        };
                        }}
                    />
            </>}
            <InputGroup>
                <Input id="vara" placeholder="Vara" onChange={(e) => setName(e.target.value)}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText onClick={() => setScanner(!scanner)}>&#128247;</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <br />
            <InputGroup>
                <InputGroupAddon type="prepend">
                    <InputGroupText>Bäst före:</InputGroupText>
                </InputGroupAddon>
                <Input defaultValue={new Date().toLocaleDateString("se-SE").split("T")[0]} type="date" placeholder="2021-02-03" onChange={(e) => setDate(e.target.value)}/>
                <InputGroupAddon addonType="append">
                    <Button className="btn btn-primary bg-success" type="submit">&#10003;</Button>
                </InputGroupAddon>
            </InputGroup>
            <br />
            <br />
        </form>
    )
}

export default AddItem