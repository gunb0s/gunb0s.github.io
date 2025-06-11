import Container from "@/components/container";
import MinimallistHeader from "@/components/minimal-list-header";
import PostList from "@/components/post-list";

export default function HomePage() {
  return (
    <Container>
      <MinimallistHeader />
      <PostList />
    </Container>
  );
}
