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

  const {
    dependencies: { database },
  } = data;

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <p>Última atualização: {updatedAt}</p>
      <p>Versão Postgres: {database.version} </p>
      <p>Quantidades de conexões máximas: {database.open_connections} </p>
      <p>Quantidades de conexões ativas: {database.max_connections}</p>
    </div>
  );
}
