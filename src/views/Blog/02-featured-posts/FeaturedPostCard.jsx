import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { getFormattedDate } from '../../../helpers'

export const FeaturedPostCard = ({ post }) => {
  return (
    <Container href={`/blog/${post.slug}`}>
      <ImageContainer>
        <Image src={`${post.image}`} height={200} width={320} alt={post.title} />
      </ImageContainer>

      <Contents>
        <Time itemprop='published' datetime={post.date}>{getFormattedDate(new Date(post.date).toString())}</Time>

        <Title>{post.title}</Title>

        <Intro>{post.intro}&hellip;</Intro>

        <TagsContainer>
          {post.tags.slice(0, 1).map((tag) => (
            <Tag key={tag.name} tag={tag}>{tag.name}</Tag>
          ))}
        </TagsContainer>
      </Contents>
    </Container>
  )
}

const Container = styled(Link)`
  --max-lines: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  &:not(:nth-of-type(1)) {
    @media screen and (min-width: 1024px) {
      height: 200px;
    }
  }
  
  // if container is a first child
  &:nth-of-type(1) {
    // if first child & screen size is above 1024px
    @media screen and (min-width: 1024px) {
      grid-row-start: 1;
      grid-row-end: 3;
      
      flex-direction: column;
      gap: 32px;
      
      --max-lines: 2;
    }

    img {
      height: 240px;
    }
  }
  
  // if not first child, then change font style for <Title> component
  &:not(:nth-of-type(1)) > div:nth-of-type(2) > h3 {
    ${typography.styles.textLg};

  }
  &:not(:nth-of-type(1)) > div:nth-of-type(2) > p,
  &:not(:nth-of-type(1)) > div:nth-of-type(2) > h3 {
    @media screen and (min-width: 1024px) {
      width: 250px;
    }

  }
  
  // if screen size is below 1024px
  @media screen and (max-width: 1024px) {
    // change font style of <Title> component of 2nd/3rd children
    & > div:nth-of-type(2) > h3 {
      ${typography.styles.textLg};
    }
  }
  
  // if screen size is below 860px
  @media screen and (max-width: 860px) {
    flex-direction: column;
    gap: 21px;

    --max-lines: 2;
  }

  // change <TagsContainer> style for first child
  &:nth-of-type(1) > div:nth-of-type(2) > div:last-of-type {
    margin-bottom: 0px;
    margin-top: 24px;
  }

`

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 860px) {
    height: auto;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 240px;

  @media screen and (min-width: 1024px) {
    width: 320px;
  }
  
  ${Container}:nth-of-type(1) > & {
    width: 100%;

    @media screen and (min-width: 1280px) {
      /* flex-basis: 280%; */
      height: 240px;
      width: 592px;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-basis: 50%;
    
  }
  
  @media screen and (max-width: 860px) {
    min-height: 240px;
  }
  
  img {
    object-fit: cover;
    width: 100%;
  }

  
`

const Time = styled.time`
  display: inline-block;
  ${typography.styles.textSm};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};
`

const Title = styled.h3`
  margin-top: 8px;
  color: ${props => props.theme.color};
  ${typography.styles.displayXs};
  ${typography.weights.semibold};
`

const Intro = styled.p`
  margin-top: 8px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textSm};
  ${typography.weights.regular};
  
  --max-lines: 2;
  ${utils.maxLines};
`

const TagsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  
  @media screen and (max-width: 1024px) {
    margin-top: auto;
    margin-bottom: 0px;
  }
  
  @media screen and (max-width: 860px) {
    margin-top: 24px;
    margin-bottom: 0px;
  }
`

const Tag = styled.div`
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  font-weight: 500;
  background-color: ${props => props.theme.isLightMode ? colors[props.tag.color || primaryColorKey]['50'] : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors[props.tag.color || primaryColorKey]['700'] : colors[props.tag.color || primaryColorKey]['400']};

  min-width: 0;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  ${utils.ellipsis};
`
