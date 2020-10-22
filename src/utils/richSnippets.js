const breadcrumb = (region) => {
  const provinceBreadcrumb = {
    '@type': 'ListItem',
    position: 2,
    name: 'Regions',
    item: 'https://canada-holidays.ca/provinces',
  }

  let breadcrumbList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Canada',
      item: 'https://canada-holidays.ca/',
    },
  ]

  if (region === 'Federal') {
    breadcrumbList = breadcrumbList.concat([
      {
        '@type': 'ListItem',
        position: 2,
        name: region,
      },
    ])
  } else if (region !== 'Canada') {
    breadcrumbList = breadcrumbList.concat([
      provinceBreadcrumb,
      {
        '@type': 'ListItem',
        position: 3,
        name: region,
      },
    ])
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList,
  }
}

const speakable = (region, path) => {
  const name =
    region === 'Federal'
      ? 'Canada’s next federal holiday'
      : `${region}’${region.slice(-1) === 's' ? '' : 's'} next holiday`

  return {
    '@context': 'https://schema.org/',
    '@type': 'WebPage',
    name,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: region === 'Canada' ? ['h1', 'h1 ~ p'] : ['h1', 'h1 + p'],
    },
    url: `https://canada-holidays.ca${path}`,
  }
}

module.exports = {
  breadcrumb,
  speakable,
}
