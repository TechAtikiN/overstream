import Navigation from './Navigation'
import Toggle from './Toggle'
import Wrapper from './Wrapper'

export default function Sidebar() {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}
