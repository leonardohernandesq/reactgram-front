import './Search.css'
import { useEffect } from 'react'
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { useDispatch, useSelector } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { Link } from 'react-router-dom'
import { useQuery } from '../../hooks/useQuery'
import { like, searchPhotos } from '../../slices/photoSlice'


const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const {user} = useSelector(state => state.auth)
    const {photos, loading} = useSelector(state => state.photo)
    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [dispatch, search])

    const handleLike = (photo) => {
        dispatch(like(photo._id))
    
        resetMessage()
    }

    if(loading){
        <p>Carregando...</p>
    }


  return (
    <div id='search'>
        <h2>Você está buscando por: {search}</h2>
        {photos && photos.map((photo) => (
            <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
            <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
            </div>
        ))}
        {photos.length === 0 && (
            <h2 className="no-photos">
            Ainda não há fotos publicadas em {search}, 
            <Link to={`/users/${user._id}`}> Clique Aqui</Link>
            </h2>
        )}
    </div>
  )
}

export default Search