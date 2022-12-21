export const data = [
  {
    title: 'Blog',
    href: '/blog'
  },
  {
    title: 'Careers',
    href: '/careers'
  },
  {
    title: 'About Us',
    href: '/about'
  },
  {
    title: 'Resources',
    children: [
      {
        type: 'section',
        title: 'Resources',
        links: [
          { title: 'Explore Marketplace', href: 'https://app.neptunemutual.com', description: 'Explore the marketplace, purchase policies, and pool liquidity', icon: 'bank', isExternal: true },
          { title: 'Blog ', href: '/blog', description: 'Visit our blog', icon: 'edit-03' },
          { title: 'Press Room', href: '/pressroom', description: 'The source for news about Neptune Mutual', icon: 'annotation-dots' },
          { title: 'Ecosystem', href: '/ecosystem', description: 'Learn how you can participate in our marketplace', icon: 'database-01' },
          { title: 'Documentation', href: 'https://docs.neptunemutual.com', description: 'Learn more about decentralized insurance and Neptune Mutual protocol', icon: 'file-code-01', isExternal: true },
          { title: 'Web3 Tools', href: '/web3-tools', description: 'Free and easy to use web3 online tools', icon: 'tool-01' }
        ]
      },
      {
        type: 'section',
        title: 'Company',
        links: [
          { title: 'About Us', href: '/about', description: 'Learn about our story and our mission statement', icon: 'flag-06' },
          { title: 'Grants and Bounties', href: '/grants-and-bounties', description: 'Learn about our referral, ambassador, and distributor programs', icon: 'stars-02' },
          { title: 'Careers', href: '/careers', description: 'We’re always looking for talented people. Join our team!', icon: 'users-01', badge: "We're Hiring!" },
          { title: 'Security', href: '/security', description: 'View our platform audit reports. Learn about our bug bounty program.', icon: 'glasses-02' },
          { title: 'Policy', href: '/policies', description: 'View our disclaimer, terms of service, and privacy policy', icon: 'folder' },
          { title: 'Contact', href: '/contact', description: 'Reach out to us via email or our community channels', icon: 'book-closed' }
        ]
      },
      {
        type: 'videos-section',
        title: 'From Our Youtube Channel',
        more: {
          title: 'All Video Tutorials',
          href: 'https://youtube.com/neptune-mutual'
        }
      }
    ]
  }
]
