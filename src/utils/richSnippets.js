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

module.exports = {
  breadcrumb,
}
