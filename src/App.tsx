import React, { useState } from "react";
import "./App.css";

interface Card {
  id: number;
  order: number;
  text: string;
}

export const App = () => {
  const [cardList, setCardList] = useState<Card[]>([
    { id: 1, order: 3, text: "Карточка 3" },
    { id: 2, order: 1, text: "Карточка 1" },
    { id: 3, order: 2, text: "Карточка 2" },
    { id: 4, order: 4, text: "Карточка 4" },
  ]);

  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  function dragStartHandler(card: Card): void {
    setCurrentCard(card);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    (e.target as HTMLDivElement).style.background = "white";
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    (e.target as HTMLDivElement).style.background = "lightgray";
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: { id: number; order: number; text: string }
  ) {
    e.preventDefault();

    if (!currentCard) return;

    setCardList(
      cardList
        .map((c) => {
          if (c.id === card.id) {
            return { ...c, order: currentCard.order };
          }
          if (c.id === currentCard.id) {
            return { ...c, order: card.order };
          }
          return c;
        })
        .sort(sortCards)
    );
    (e.target as HTMLDivElement).style.background = "white";
  }

  const sortCards = (a: Card, b: Card): number => {
    return a.order - b.order;
  };

  return (
    <div className="app">
      {cardList.map((card) => (
        <div
          key={card.id}
          onDragStart={() => dragStartHandler(card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable={true}
          className="card"
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};
