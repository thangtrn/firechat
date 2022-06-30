import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthProvider'

const ChatContext = createContext()

function ChatProvider({children}) {
    const [selectedRoom, setSelectedRoom] = useState()
    const [rooms, setRooms] = useState() 

    const { user } = useAuth()

    useEffect(()=> {
        let unsub = ()=> {}
        if(user?.uid) {
            const collectionRef = collection(db, "rooms")
            const q = query(collectionRef, where("members", "array-contains", user.uid), orderBy("createAt", "desc"))
            unsub = onSnapshot(q, async snapshot => {
                const data = await snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setRooms(data)
                console.log(data);
            })
        }
        return unsub
    },[user])

    console.log("rooms: ",rooms);
    console.log("Selected room: ", selectedRoom);

    const handleSetSelectedRoom = (room)=> {
        setSelectedRoom(room)
    }

    return (
        <ChatContext.Provider value={{selectedRoom, rooms, handleSetSelectedRoom}}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChatStore() {
    return useContext(ChatContext)
}

export default ChatProvider
