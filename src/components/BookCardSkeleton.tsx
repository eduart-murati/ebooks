import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const BookCardSkeleton = () => {
  return (
    <Card.Root>
      <Skeleton height="450px">
        {" "}
        {/* librat zakonisht nuk kanë 600px si filmat */}
        <CardBody>
          <SkeletonText mt="4" noOfLines={3} gap="3" />
        </CardBody>
      </Skeleton>
    </Card.Root>
  );
};

export default BookCardSkeleton;
