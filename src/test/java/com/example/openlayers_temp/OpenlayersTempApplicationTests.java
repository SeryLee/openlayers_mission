package com.example.openlayers_temp;

import com.example.openlayers_temp.entity.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

@SpringBootTest
@Transactional
class OpenlayersTempApplicationTests {

	@PersistenceContext
	EntityManager em;

	@BeforeEach
	void initTest() {
		Member member1 = new Member("테스터1", "신사역");
		Member member2 = new Member("테스터2", "학동역");
		//영속성 컨텐츠에 persist
		em.persist(member1);
		em.persist(member2);
		em.flush();

		//아래 결과가 member.getId() = 1 인 이유???
		System.out.println("member.getId() = " + member1.getId());
		System.out.println("member.getId() = " + member2.getId());

		//CRUD
	}

	@Test
	void contextLoads() {
		Member member1 = new Member("테스터", "신사역");
		Member member2 = new Member("테스터", "신사역");
		//영속성 컨텐츠에 persist
		em.persist(member1);
		em.persist(member2);
		em.flush();

		//아래 결과가 member.getId() = 1 인 이유???
		System.out.println("member.getId() = " + member1.getId());
		System.out.println("member.getId() = " + member2.getId());

		//CRUD
	}

	@Test
	void selectAllTest() {
		//Member 전체 읽어오기
		List<Member> members = em.createQuery("select m from Member m", Member.class).getResultList();
		System.out.println("members.size() = " + members.size());
		for (Member member : members) {
			System.out.println("member = " + member);
		}


	}
	@Test
	void findOneMemberTest() {
		// jpql 사용해서 select
		// where 하나만
		Member hakdongMember = em.createQuery("select m from Member m where m.address = '학동역'", Member.class).getSingleResult();
		System.out.println("hakdongMember.getId() = " + hakdongMember.getId());
		System.out.println("hakdongMember.getName() = " + hakdongMember.getName());
		System.out.println("hakdongMember.getAddress() = " + hakdongMember.getAddress());
	}
	@Test
	void deleteOneMemberTest() {
		// delete 하나
		Query query = em.createQuery("delete from Member m where m.name = :name").setParameter("name", "테스터1");
		int i = query.executeUpdate();
		System.out.println("i = " + i);
		em.flush();
		// 삭제가 잘 되었는지 나머지 정보 출력
		List<Member> list = em.createQuery("select m from Member m", Member.class).getResultList();
		for (Member member : list) {
			System.out.println("member = " + member.getName());
		}
	}
	@Test
	void updateMemberTest() {
		// update 1. update set ~~~
//		Query query = em.createQuery("update Member m set m.address = '강남역' where m.name = :name")
//				.setParameter("name", "테스터2");
//		int i = query.executeUpdate();
//		System.out.println("i = " + i);
//		em.flush();


		// 2. 영속성을 사용해서 하는방법
		Member updateMember = em.find(Member.class, 2L);
		updateMember.setAddress("강남역");
		em.flush();


		// 수정이 잘 되었는지 정보 출력
		em.clear();
		List<Member> list = em.createQuery("select m from Member m", Member.class).getResultList();
		for (Member member : list) {
			System.out.println("member = " + member.getName()+", address = "+ member.getAddress());
		}

	}
}
