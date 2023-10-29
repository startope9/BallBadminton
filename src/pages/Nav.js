
import './nav.css'
import { useNavigate } from 'react-router-dom'

export default function Nav({ value = 0 }) {

    const navigate = useNavigate();


    const handleLogout = () => {
        (async () => {
            await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res === 200) navigate('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        })();
    }


    function letsFix() {
        let top = window.scrollY;

        let point = document.getElementById('header');
        let height = point.offsetHeight;

        if (height + top > 120) {
            point.classList.add('sticky')
        }
        else {
            if (point.classList.contains('sticky'))
                point.classList.remove('sticky')
        }

    }

    window.addEventListener('scroll', letsFix);

    return (
        <div>
            <div className='header' id='header'>
                <div className="nav-bar" id='nav-bar'>
                    <div className='item-1'>Ball Badminton</div>
                    <div></div>
                    <div className='items-not-1'>
                        <div onClick={() => { navigate('/') }}>Home</div>
                        <div onClick={() => { navigate('/about') }}>About</div>
                        <div onClick={() => { navigate('/contact') }}>Contact</div>
                        {value ?
                            <div onClick={handleLogout}>Logout</div>
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


