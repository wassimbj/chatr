import React from 'react'

export default function UserTochatWith({image, name, chatwith, userIsOnline}) {
    return (
        <div class="sm:w-1/4 p-2">
            <div class="bg-white px-6 py-8 rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-xl text-center">
                <div class="mb-3">
                    <img
                        class="w-auto mx-auto rounded-full"
                        src={`${image}`}
                        alt=""
                    />
                </div>

                <h2 class="text-xl font-medium text-gray-700"> {name} </h2>
                <div className='p-2'>
                    {
                        userIsOnline
                            ?
                            <span className='text-sm text-white bg-green-600 py-1 px-2 rounded-full'> Online </span>
                            :
                            <span className='text-sm text-white bg-red-600 py-1 px-2 rounded-full'> Offline </span>
                    }
                </div>
                <a href={`/messages/${chatwith}`} class="px-4 py-2 bg-blue-500 text-white rounded-full mt-3 block hover:bg-blue-600"> Start chatting </a>
            </div>
        </div>
    )
}
