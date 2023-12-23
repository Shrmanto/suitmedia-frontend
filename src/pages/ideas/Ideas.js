import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Card from '../../components/card/Card'
import BannerImg from '../../assets/banner.jpg';
import { ApiConsume } from '../../utility/Api';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import './Ideas.css'

const Ideas = ()=> {
    const [ideasData, setIdeasData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('published_at');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0); 
    const [scrollPosition, setScrollPosition] = useState(0);

    const pageStart = (pageNumber - 1) * 1 + 1;

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    const BannerStyle = {
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: 'cover',
        backgroundPositionY: `calc(50% - ${scrollPosition * 0.5}px)`,
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await ApiConsume({
              pageNumber: pageNumber,
              pageSize: perPage, 
              sorting: sortBy 
            });
            setIdeasData(data);
            console.log('Fetched Data:', data);
            const totalPages = Math.ceil(data.total / perPage);
          } catch (error) {
            console.error('Error fetching ideas:', error); 
          }
        };
    
        fetchData();
    }, [pageNumber, perPage, sortBy])  

    const handlePerPageChange = (e) => {
        const selectedPerPage = parseInt(e.target.value, 10);
        setPerPage(selectedPerPage);
        setPageNumber(1);
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const handleFirstPage = () => {
        setPageNumber(1);
    };

    const handleLastPage = () => {
        setPageNumber(totalPages);
    };

    return (
        <div>
            <Navbar />
            <section id='hero' style={BannerStyle}>
                <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight : '100vh' }}>
                    <div className='content-hero'>
                        <h1>Ideas</h1>
                        <p>Where all our great things begin</p>
                    </div>
                </div>
            </section>

            <section id='content-card'>
                <div className='container-fluid mt-5'>
                    <div className='row mb-5'>
                        <div className='col-6 d-flex justify-content-start'>
                            <h5 className='mt-2'>{`Showing ${pageStart} - ${Math.min(perPage * pageNumber,ideasData.length)} of 274`}</h5>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <h5 className='mt-2'>Show per page : </h5>
                            <select className="form-select ms-3" onChange={handlePerPageChange} value={perPage}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <h5 className='mt-2 ms-5'>Sort by : </h5>
                            <select className="form-select ms-3" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value={"published_at"}>Newest</option>
                                <option value={"-published_at"}>Oldest</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                    {ideasData.map(data => (
                        <Card
                        key={data.id}
                        imageUrl={data.medium_image[0]?.url}
                        dateCreated={data.created_at}
                        title={data.title}
                        />
                    ))}
                    </div>
                    <div className='pagination d-flex justify-content-center'>
                        <div className='content-pagination-left'>
                            <button onClick={handleFirstPage}><MdOutlineKeyboardDoubleArrowLeft /></button>
                            <button onClick={() => handlePageChange(pageNumber - 1)}><MdOutlineKeyboardArrowLeft /></button>
                        </div>
                        <div className='content-pagination-right'>
                            <button onClick={() => handlePageChange(pageNumber + 1)}><MdOutlineKeyboardArrowRight /></button>
                            <button onClick={handleLastPage}><MdOutlineKeyboardDoubleArrowRight /></button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Ideas;