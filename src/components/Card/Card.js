import React from "react";
import Card from 'react-bootstrap/Card';
import styles from './Card.module.scss'

const CardItem = (props) => {

    const { item, currentCard, setCurrentCard, cardList, setCardList } = props;

    function dragStartHandler(e, item) {
        setCurrentCard(item);
    }

    function dragEndHandler(e) {
        e.target.style.background = 'rgb(204, 241, 241)'
    }

    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = 'lightgray'
    }

    function dropHandler(e, item) {
        e.preventDefault();

        setCardList(cardList.map((c) => {
            if (c.id === item.id) {
                return { ...c, order: currentCard.order }
            }
            if (c.id === currentCard.id) {
                return { ...c, order: item.order }
            }
            return c;
        }))
        e.target.style.background = 'rgb(204, 241, 241)'
    }

    return (
        <Card className={styles.card} draggable={true}
            onDragStart={(e) => dragStartHandler(e, item)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, item)}>
            <Card.Img className={styles.img} variant="top" src={item.img} alt={item.title} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center' }} >{item.title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default CardItem