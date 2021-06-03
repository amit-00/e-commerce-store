import { useContext } from 'react';
import { CurrencyContext } from '../../lib/context';

const CurrencyToggle = () => {
    const { cad, changeCurrency } = useContext(CurrencyContext);

    return (
        <div className='flex'>
            <div className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${ cad ? 'bg-gray-400' : 'bg-red-400' }`} onClick={() => changeCurrency()} >
                <label className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${ cad ? 'translate-x-0 border-gray-400' : 'translate-x-full border-red-400' }`}></label>
            </div>
            <img className='h-6 w-6 ml-2' src={ cad ? '/assets/canada.png' : '/assets/usa.png' } alt="" />
        </div>
    )
}

export default CurrencyToggle;
