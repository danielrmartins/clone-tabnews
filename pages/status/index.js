import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const data = await response.json();

  return data;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <p>
            Última atualização:{" "}
            {new Date(data.updated_at).toLocaleString("pt-BR")}
          </p>
          <p>Versão Postgres: {data.dependencies.database.version} </p>
          <p>
            Quantidades de conexões máximas:{" "}
            {data.dependencies.database.open_connections}{" "}
          </p>
          <p>
            Quantidades de conexões ativas:{" "}
            {data.dependencies.database.max_connections}
          </p>
        </>
      )}
    </div>
  );
}
