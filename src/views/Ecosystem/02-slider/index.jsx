import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { utils } from '../../../../styles/utils'
import { Carousel } from './Carousel'
import { EcosystemFilter } from './Filter'

export const EcosystemSlider = ({ ecosystems }) => {
  const types = useMemo(() => {
    return ['', ...new Set(ecosystems.map(x => x.type))]
  }, [ecosystems])

  const [selectedOption, setSelectedOption] = useState(types[0])

  const filtered = selectedOption ? ecosystems.filter(ecosystem => ecosystem.type === selectedOption) : ecosystems

  return (
    <Container>
      <InnerContainer>
        <FilterContainer>
          <EcosystemFilter types={types} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </FilterContainer>
        <CarouselContainer>
          <Carousel ecosystems={filtered} />
        </CarouselContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer};
`

const InnerContainer = styled.div`
`

const FilterContainer = styled.div`
  position: relative;
`

const CarouselContainer = styled.div`
  @media (max-width: 768px) {
    max-width: none;
    margin-left: -16px;
    margin-right: -16px;
  }
`
