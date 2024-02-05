import React from 'react'
import { Link } from 'react-router-dom'

export default function NewsItems(props) {
  return (
  <div className="card">
    <img src={props.imageUrl?props.imageUrl:"https://www.hollywoodreporter.com/wp-content/uploads/2023/07/Haunted-Mansion-Barbie-and-Oppenheimer-Split-H-2023.jpg?w=1024"} className="card-img-top" alt="..."/>
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:1}}>
      {props.name}
      <span className="visually-hidden">unread messages</span>
    </span>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">{props.description}</p>
      <p className="card-text"><small className="text-body-secondary">By {props.author?props.author:"Unknown"} on {props.date}</small></p>
      <Link to={props.newsUrl} target="_blank" className="btn btn-primary">Read More</Link>
    </div>
  </div>
    
  )
}
