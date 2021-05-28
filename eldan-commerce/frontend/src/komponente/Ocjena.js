import React from 'react'

const Ocjena = ({ ocjena, brPregleda, boja }) => {
    return (
        <div className="zvjezdice">
            <span>
                <i style={{ color: boja }} className={ocjena >= 1 ? 'fas fa-star' : ocjena >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color: boja }} className={ocjena >= 2 ? 'fas fa-star' : ocjena >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color: boja }} className={ocjena >= 3 ? 'fas fa-star' : ocjena >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color: boja }} className={ocjena >= 4 ? 'fas fa-star' : ocjena >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color: boja }} className={ocjena >= 5 ? 'fas fa-star' : ocjena >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>{brPregleda} pregleda</span>
        </div >
    )
}

Ocjena.defaultProps = {
    boja: '#e8e538'
}


export default Ocjena
