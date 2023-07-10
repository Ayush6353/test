import React, { useEffect, useState } from 'react'
// import Loading from "./Loading";

const HooksApi = () => {


    const [Datauser, setDatauser] = useState([]);
    const[loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            setLoading(false);
            const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
            setDatauser(await response.json());
        } catch (error) {
            console.error("my error"+error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    if(loading){
        return (
            <div className='spiner'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    

    return (
        <>
            
            <div className='container-fluid mt-5'>
                <div className='row text-center'>
                    {
                        Datauser.map((valudata) => {
                            return (
                                <div className="col-6 col-md-3 contaner_m3 aos-init aos-animate fade-right" data-aos="fade-right" data-aos-duration="2000">
                                    <div className="card_img">
                                        <div className="card_i1">
                                            <img src={valudata.url} className="img-fluid card_i1_m3" />
                                        </div>
                                        <div className="card_t1">
                                            <h3 className="kiopn">{valudata.id}</h3>
                                            <p className="kipon_p">{valudata.title}</p>
                                        </div>
                                    </div>
                                    <div className="card_p">
                                        <div className="card_p_m3">
                                            <div className='profildata'>
                                                <h5>Articles</h5>
                                                <p>38</p>
                                            </div>
                                            <div className='profildata'>
                                                <h5>Followers</h5>
                                                <p>980</p>
                                            </div>
                                            <div className='profildata'>
                                                <h5>Rating</h5>
                                                <p>8.9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default HooksApi;