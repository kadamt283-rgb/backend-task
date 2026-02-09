import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ title, paths = [] }) => {
    return (
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">{title}</h1>
            <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {paths.map((path, index) => (
                    <li key={index} className={`breadcrumb-item ${index === paths.length - 1 ? 'active text-white' : ''}`}>
                        {index === paths.length - 1 ? path.name : <Link to={path.url}>{path.name}</Link>}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Breadcrumb;
