import React from 'react'
import '../card/Card.css'

const Card = ({ imageUrl, dateCreated, title })=> {

    const formattedDate = new Date(dateCreated);

    // Format tanggal dalam format yang diinginkan
    const formattedDateString = formattedDate.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
        <div className='col-3 mb-4'>
            <div className='card'>
                <img src={imageUrl} className='card-img-top' alt={title}/>
                <div className='card-body'>
                    <p className='card-text'>{formattedDateString}</p>
                    <h5 className='card-title'>{title}</h5>
                </div>
            </div>
        </div>
    )
}

export default Card;