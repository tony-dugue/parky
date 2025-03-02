'use client'
import { add } from '@parky/sample-lib'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@parky/network/src/gql/generated'
export default function Home() {
  const { data } = useQuery(CompaniesDocument)
  return (
    <main>
      Hello {add(343, 3)}
      <div>
        {data?.companies.map((company) => (
          <div className="p-4 bg-gray-100 rounded" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
