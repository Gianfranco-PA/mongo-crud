import { FormEvent } from 'react'
import styles from './form.module.css'
interface campoProps {
  id: string
  label: string
  value: string
  onChange: (event: FormEvent<HTMLInputElement>) => void
}

const Campo = ({ id, label, value, onChange }: campoProps) => {
  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={id} value={value} onChange={onChange} />
    </div>
  )
}

export default Campo
