import React, { useContext } from 'react'
import { MainContext } from '../context/Context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const WithoutLoginMembershipPage = () => {
    const { membershipOptions } = useContext(MainContext)
    return (
        <div className='mx-auto max-w-[1200px] '>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1F2A3C] mt-10 mb-5">
                Membership
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {membershipOptions.map((option, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-5">
                        <div className="text-center text-3xl md:text-4xl font-bold bg-[#2A293E] text-white py-3 border-b">
                            ${option.price / 100}.00
                        </div>
                        <div className="text-center text-xl md:text-2xl font-bold bg-[#2A293E] text-white py-3">
                            {option.name}
                        </div>
                        <div className="text-center p-4 md:p-8 text-[#2E2E2E] flex flex-col gap-5">
                            <p>
                                A free Registration enables access to vendor’s contact details and the addition of products to a wish list.
                            </p>
                            <p>
                                A paid Membership enables Members to create and advertise an unlimited number of products, Member’s profiles and their contact details during the duration of the chosen Membership term.
                            </p>
                            <p>

                                Each individual advertisement is limited to 5 images but has no restrictions on text.
                            </p>
                            <p>

                                Given that no commission is required on any sales, members are responsible for negotiating all transactions, coordinating payments, and arranging shipping with buyers directly.
                            </p>
                            <p>
                                A portion of all membership fees will be utilized for the marketing and enhancement of the website and its content.
                            </p>
                            <p>
                                <b>
                                    A Member will receive a $10 referral fee for each new
                                    Member referral.
                                </b>
                            </p>
                            <p>
                                <b>Unlimited</b> Products
                            </p>
                        </div>


                        <Link to={'/login'} className='flex justify-center'>
                            <button
                                className="w-[250px] py-3 px-4  bg-[#F05025] text-white"
                                onClick={() => toast.error("You Not loged in please login!")}
                            >
                                Buy Now
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WithoutLoginMembershipPage