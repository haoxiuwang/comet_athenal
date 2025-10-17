import {useState,useEffect,useRef} from "react"
import openDB from "../lib/indexdb"
import query from '../components/query.js';
export default function Edit() {
  const [data,setData] = useState(null)
  useEffect(()=>{
    let db;
    openDB()
    .then((_db)=>{
      db=_db;
      return query(db,'infos',()=>true)
    })
    .then((_data)=>{
      setData(_data)
      db.close_db()
    })
  },[])

  return(
    <div>
      {
        data&&data.map((item)=>{
          return (
            <div onClick={()=>{
              openDB()
              .then((db)=>{
                db.delete({
                  tableName: 'blobs',
                  condition: item => {
                    return item.id == item.id
                  },
                  success: res => {
                    console.log('blobs删除成功')
                  }
                })

                db.delete({
                  tableName: 'infos',
                  condition: item => {
                    return item.id == item.id
                  },
                  success: res => {
                    console.log('infos删除成功')
                  }
                })
                let _arr = []
                for (var i = 0; i < data.length; i++) {
                  if (data[i].id!=item.id) _arr.push(data[i])
                }
                setData(_arr)
              })

            }}>{item.title}</div>
          )
        })
      }
    </div>
  )
}
