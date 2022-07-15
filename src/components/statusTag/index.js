import styles from './status.module.css'

const StatusTag = ({ label, color }) =>
  <span className={styles[color]}>
    {label}
  </span>

export default StatusTag
