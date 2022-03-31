import React, {FC, useContext, useState} from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import IRoute from '../../interfaces/route';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router';
import EventService from '../../services/EventService';
import { API_URL } from '../../http';

export const AddEventForm: FC = () => {
    const[name, setName] = useState<string>('')
    const[desc, setDesc] = useState<string>('')
    const[participants, setParticipants] = useState<Array<string>>([])
    const[participant, setParticipant] = useState<string>('')
    const[genres, setGenres] = useState<Array<string>>([])
    const[genre, setGenre] = useState<string>('')
    const[date, setDate] = useState<Date>(new Date('Sept 24, 22 13:20:18'))
    const[adress, setAdress] = useState<string>('')
    const[avatar, setAvatar] = useState<File>(new File(["none"], "none"))
    
    const navigate = useNavigate()
    const url = API_URL.replace("/api", "")
    
    const {store} = useContext(Context)
    
    return (
    <div className="bg-grey-lighter min-h-screen flex flex-col py-6">
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded drop-shadow-lg text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Створення музичної події</h1>
                
                <div className='flex justify-center flex-col'>
                    <div className='flex justify-center'>
                        <img src={URL.createObjectURL(avatar)}></img>
                    </div>
                    <div className='flex justify-center mt-3'> 
                        <input type="file" onChange={e => {
                            const files = e.target.files
                            if(!files) return
                            const file = files[0]
                            if(!file) return
                            setAvatar(file)
                        }}/>
                    </div>
                </div>
                
                <label>Назва: </label>
                <input 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="fullname"
                    placeholder="Назва" />
    
                <form>
                    <label>Жанри: </label>
                
                    <input 
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fenre"
                        placeholder="Жанр" />
                        
                    <div className='flex flex-row'>
                        {genres.map(item => {
                            return <div className='px-2 bg-stone-400 rounded ml-2'>{item}</div>
                        })}
                    </div>
                    
                    <div className='py-3'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => {setGenres(genres.concat(genre)); setGenre('')}}
                        >Додати</button>
                    </div>
                </form>
                
                <DatePicker 
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    selected={date} 
                    onChange={(date:Date) => setDate(date)} />
                    
                <form>
                    <label>Учаники: </label>
                
                    <input 
                        value={participant}
                        onChange={e => setParticipant(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fenre"
                        placeholder="Учасник" />
                        
                    <div className='flex flex-row'>
                        {participants.map(item => {
                            return <div className='px-2 bg-stone-400 rounded ml-2'>{item}</div>
                        })}
                    </div>
                    
                    <div className='py-3'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => {setParticipants(participants.concat(participant)); setParticipant('')}}
                        >Додати</button>
                    </div>
                </form>
                    
                <input 
                    onChange={e => setAdress(e.target.value)}
                    value={adress}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="cell"
                    placeholder="Місто" />
                    
                <input 
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="cell"
                    placeholder="Опис" />
                    
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 focus:outline-none my-1"
                    onClick = {() => { 
                        EventService.createEvent(name, store.user.id, desc, genres, date, adress, participants, avatar)
                        navigate('/events')
                        window.location.reload()
                    }}
                >Додати подію</button>
    
            </div>
        </div>
    </div>
    )
}

export default AddEventForm