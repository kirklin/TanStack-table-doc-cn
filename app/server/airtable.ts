import Airtable from 'airtable'

const airtable = () => new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })


export async function getTiersTable() {
  const base = airtable().base('apppS8mjo4MMR3pif')
  return base('tiers')
}

