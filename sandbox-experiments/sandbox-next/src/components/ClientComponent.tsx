'use client'

export interface Props {
  onClick?: () => void
}

export function ClientComponent({ onClick }: Props) {

  return (
    <button onClick={onClick} >
      Client button
    </button>
  )
}