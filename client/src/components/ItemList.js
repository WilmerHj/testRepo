import {useState, useEffect, React} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AddItem from './AddItem';
import { post } from '../scripts/basics';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [addItem, setAddItem] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`${window.location.protocol}//${window.location.hostname}:5000/api/items/`)
            .then(res => {
                if(res.ok) return res.json()
                throw res;
            })
            .then(data => {
                setItems(data);
            })
            .catch(err => {console.log(err); setError(err)})
            .finally(() => setLoading(false));
    }, [])

    if(loading) return "Loading...";
    if(error) return "Error!"

    return (
        <Container>
            <Button color="dark" style={{marginBottom: "2rem"}}
                onClick={() => {
                    setAddItem(!addItem);
                }}
            >Lägg till vara
            </Button>
            {addItem && <AddItem onAdd={({name, date}) => {
                post('POST', {name:name, date:date});
                window.location.reload();
            }}/>}
            <ListGroup>
                <TransitionGroup>
                    {items.map(({id, name, bbd}, i) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <>
                            <ListGroupItem className="item" style={{backgroundColor:"#f0f0f0"}}>
                                <div style={{float:"left"}}>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() =>{
                                        // DELETE()
                                        post('DELETE', {id:id});
                                        setItems(items.filter(item => item.id !== id));
                                    }}
                                >&times;
                                </Button>
                                </div>
                                <div>
                                    {name}
                                </div>
                                <div style={{fontWeight:"lighter"}}>
                                    {new Date(Number(bbd)).toLocaleDateString("se-SE").split("T")[0]}
                                </div>
                            </ListGroupItem>
                            {i % 5 === 0 && i > 1 && <img className="item" width="100%" src="https://via.placeholder.com/468x60?text=Reklam" alt=""/>}
                            </>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

export default ItemList