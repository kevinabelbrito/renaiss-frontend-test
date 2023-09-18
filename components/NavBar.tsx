import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

type NavBarProps = {
    sidebarOptions: boolean
    setSidebarOptions: Function
}

export default function NavBar({sidebarOptions, setSidebarOptions}: NavBarProps) {

    const toggleSidebar = () => {
        setSidebarOptions(!sidebarOptions);
    }

    return (
        <div className='py-5 px-10 bg-orange-primary text-white flex justify-between'>
            <div className="">
                <Link 
                    href='#' 
                    className='navigation-button'
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className="ml-2">
                        Atras
                    </span>
                </Link>
                <button 
                    type='button'
                    className={`navigation-button ${sidebarOptions ? '' : 'active'} ml-3`}
                    onClick={() => toggleSidebar()}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <div className="">
                <button 
                    type='button'
                    className='navigation-button'
                >
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </div>
    )
}
